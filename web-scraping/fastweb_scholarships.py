from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from pymongo import MongoClient
import string
from dotenv import load_dotenv
import os


def safe_get_text(el):
    return el.get_text(strip=True) if el else "N/A"

def extract_gpa(text):
    if not text:
        return None
    words = text.split()
    for i, word in enumerate(words):
        if word.lower().strip(string.punctuation) == "gpa":
            for offset in [-1, -2, 1, 2]:  # Try nearby words
                index = i + offset
                if 0 <= index < len(words):
                    try:
                        return float(words[index].strip(string.punctuation))
                    except ValueError:
                        continue
            return None
    return None

load_dotenv()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(storage_state="state.json")    # add cookies and localstorage data in state.json file to avoid login issue while scraping 

    page = context.new_page()
    base_url = "https://www.fastweb.com/directory/scholarships-by-state"
    page.goto(base_url)
    page.wait_for_load_state("networkidle")

    client = MongoClient(os.getenv("MONGODB_URL"))
    db = client['from_fastweb_scholarships'] 
    collection = db['all_scholarships']  

    soup = BeautifulSoup(page.content(), "html.parser")
    divs = soup.find_all("div", class_="grid-x grid-margin-x us-states")
    i = 1

    for state_div in divs:
        state_links = state_div.find_all('li')

        for state_item in state_links:
            state_href = state_item.a.get("href")
            state_name = state_item.a.get_text()
            full_state_url = urljoin(base_url, state_href)

            page2 = context.new_page()
            page2.goto(full_state_url)
            page2.wait_for_load_state("networkidle")

            soup2 = BeautifulSoup(page2.content(), "html.parser")
            scholarship_rows = soup2.find_all("tbody", class_="scholarship_wrap")

            for row in scholarship_rows:
                if row.a:
                    scholarship_href = row.a.get("href")
                    full_scholarship_url = urljoin(full_state_url, scholarship_href)

                    page3 = context.new_page()
                    page3.goto(full_scholarship_url)
                    page3.wait_for_load_state("networkidle")

                    soup3 = BeautifulSoup(page3.content(), "html.parser")
                    state_item3 = soup3.find("div", class_="cell large-8")
                    state_item4 = soup3.find("div", class_="award-description-section")

                    if state_item3:
                        title = safe_get_text(state_item3.find('h1', class_="award-name"))
                        provider_tag = state_item3.find('p', class_="award-provider") or state_item3.find('a', class_="award-provider")
                        provider = safe_get_text(provider_tag)

                        amountwrapper = state_item3.find('div', class_="award-amount-wrapper")
                        amount = safe_get_text(amountwrapper.find('p', class_="award-info") if amountwrapper else None)

                        countwrapper = state_item3.find('div', class_="awards-count-wrapper")
                        awards = safe_get_text(countwrapper.find('p', class_="award-info") if countwrapper else None)

                        deadlinewrapper = state_item3.find('div', class_="award-deadline-wrapper")
                        deadline = deadlinewrapper.find('p', class_="award-info").find(string=True, recursive=False).strip() if deadlinewrapper else "N/A"

                        a_tag3 = state_item3.find('div', class_="apply-now-button-wrapper")
                        directLink = a_tag3.a.get("href") if a_tag3 and a_tag3.a else "N/A"

                        description = safe_get_text(state_item4.find('p', class_="award-description") if state_item4 else None)
                        ex_gpa = extract_gpa(description)
                        gpa = ex_gpa if ex_gpa else "--"

                        print(f'{i}) innerlink: {full_scholarship_url}')
                        print(f'Title: {title}\nProvider: {provider}\nState: {state_name}\nAmount: {amount}\nAwards: {awards}\nDeadline: {deadline}\nDescription: {description}\nGPA: {gpa}\nApply Link: {directLink}\n')
                        print("-" * 110)
                        
                        result = collection.insert_one(
                        {"title": title,  
                        "provider": provider,
                        "state": state_name,
                        "amount": amount,
                        "award": awards,
                        "deadline": deadline,
                        "description":description,
                        "mingpa":gpa,
                        "apply": directLink,}
    )

                        i += 1

                    page3.close()
            page2.close()

    page.close()
    browser.close()
