# Belly-Button-Challenge
UTSA Data Analytics Bootcamp challenge utilizing JavaScript to create data visualizations based on datasets involving microbe diversity of the human belly button.

------------------------------------------------------------------------------------------------------------------
STATIC

Within the Belly-Button-Challenge repository there is the static folder that contains the js folder which holds the app.js file. The app.js file is responsible for running the script that populates the index.html page with various data visualizations on belly button microbes present in a panel of human subjects. 

Data visualizations include a horizontal bar chart of the top ten most prevalent OTU id specimens found in the subject belly button along with present sample values. In addition, a bubble chart displays at the botton to visualize sample values with increasingly larger bubbles based on higher values. Lastly, subject metadata is populated in the demographics panel to left hand side for each individual subject.

Subject ID numbers can be changed by using the dropdown menu and corresponding data visualizations will be altered in conjuction as a new subject ID is selected, with that subject IDs relevant data displayed on the page.

INDEX.HTML

The index.html file serves to build the initial skeleton of the webpage, displaying the demographic info panel and page header to describe the purpose of the webpage. The index.html also references the static/js/app.js file path in the script tags in order to populate the html with visualizations.