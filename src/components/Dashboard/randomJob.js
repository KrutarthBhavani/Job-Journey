import {v4 as uuid} from 'uuid';
import { categories, job_type } from '../../constants';

const companies = [
    "Apple",
    "Microsoft",
    "Amazon",
    "Google",
    "Meta",
    "Tesla",
    "Samsung",
    "IBM",
    "Toyota",
    "Coca-Cola",
    "McDonald's",
    "Nike",
    "Walmart",
    "General Electric",
    "Sony",
    "Intel",
    "Adobe",
    "Netflix",
    "IBM",
    "Oracle",
    "Uber",
    "Nvidia"
]

const urls = {
    "Apple": "https://www.apple.com",
    "Microsoft": "https://www.microsoft.com",
    "Amazon": "https://www.amazon.com",
    "Google": "https://www.google.com",
    "Meta": "https://www.facebook.com",
    "Tesla": "https://www.tesla.com",
    "Samsung": "https://www.samsung.com",
    "IBM": "https://www.ibm.com",
    "Toyota": "https://www.toyota.com",
    "Coca-Cola": "https://www.coca-cola.com",
    "McDonald's": "https://www.mcdonalds.com",
    "Nike": "https://www.nike.com",
    "Walmart": "https://www.walmart.com",
    "General Electric": "https://www.ge.com",
    "Sony": "https://www.sony.com",
    "Intel": "https://www.intel.com",
    "Adobe": "https://www.adobe.com",
    "Netflix": "https://www.netflix.com",
    "Oracle": "https://www.oracle.com",
    "Uber": "https://www.uber.com",
    "Nvidia": "https://www.nvidia.com",
  }

const positions = [
    "Software Engineer",
    "Systems Analyst",
    "Network Administrator",
    "Database Administrator",
    "Web Developer",
    "DevOps Engineer",
    "Security Analyst",
    "IT Project Manager",
    "Business Analyst",
    "Data Scientist",
    "UI/UX Designer",
    "QA Engineer",
    "IT Support Specialist",
    "Cloud Architect",
    "Network Engineer",
    "Systems Administrator",
    "Front-end Developer",
    "Back-end Developer",
    "Full Stack Developer",
    "IT Manager"
]
const usa_cities = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "San Francisco",
    "Columbus",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington, D.C.",
    "Boston",
    "Nashville",
    "Baltimore",
    "Oklahoma City",
    "Portland",
    "Las Vegas",
    "Miami",
    "Atlanta",
    "New Orleans",
    "Detroit",
    "Minneapolis",
    "Salt Lake City",
    ""
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export const getJobData = (num_data) =>{
    let data = []

    if(num_data <= 0) throw "ERROR: number of data samples must be greater than zero"

    for(let i = 0; i < num_data; i++){
        const company = companies[getRandomInt(companies.length)]
        data.push({
            id: uuid(),
            company: company,
            position: positions[getRandomInt(positions.length)],
            category: categories[getRandomInt(categories.length)],
            salary: getRandomInt(100000),
            jobType: job_type[getRandomInt(job_type.length)],
            location: usa_cities[getRandomInt(usa_cities.length)],
            url: urls[company],
            desc: "Some Description"
        })
    }

    return data
}
