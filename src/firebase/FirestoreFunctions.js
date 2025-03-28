import { collection, doc, setDoc, addDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { categories } from "../constants";
import { db } from "../main";

const dashboard_coll = "dashboards"
const user_coll  = "users"

export async function setupDashboard(uid){
    try{
        const docRef = doc(db, dashboard_coll, uid)
        const name = "Job Hunt " + new Date().getFullYear()
        await setDoc(docRef,
            {
                name: name,
                categories: categories,
                jobs: []
            }
        )
        console.log("Dashboard created with ID: ", docRef.id);
        return true
    }catch(e){
        console.error("Error setting up Dashboard: ", e);
        return false
    }
}

export async function setUserDetails(uid, name, email){
    try{
        const docRef = doc(db, user_coll, uid)
        await setDoc(docRef,
            {
                name: name,
                email: email
            }
        )
        console.log("Document written with ID: ", docRef.id);
        return true
    }catch(e){
        console.error("Error adding document: ", e);
        return false
    }
}


export async function addJob(uid, jobData){
    try{
        const dashboardRef = doc(db, dashboard_coll, uid)
        await updateDoc(dashboardRef, {
            "jobs": arrayUnion(jobData)
        })

        console.log("Job added with ID: ", jobData.id);
        return true
    }catch(e){
        console.error("Error adding Job Data: ", e);
        return false
    }
}

export async function updateJob(uid, jobData){
    try{
        const dashboardRef = doc(db, dashboard_coll, uid)
        const dashboardSS = await getDoc(dashboardRef)

        const jobs = dashboardSS.data().jobs

        const jobIndex = jobs.findIndex(job => job.id === jobData.id)

        if(jobIndex == -1) throw "No Job to update with id: " + jobData.id

        if(jobData.delete){
            jobs.splice(jobIndex, 1)
        }else jobs.splice(jobIndex, 1, jobData)

        await updateDoc(dashboardRef, {
            "jobs": jobs
        })
        
        console.log("Job updated with ID: ", jobData.id);
        return true
    }catch(e){
        console.error("Error updating Job Data: ", e);
        return false
    }
}

export async function getDashboardData(uid){
    try{
        const dashboardRef = doc(db, dashboard_coll, uid)
        const dashboardSS = await getDoc(dashboardRef)

        return dashboardSS.data()
    }catch(e){
        console.error("Error fetching Dashboard Data: ", e);
        return false
    }
}

export async function updateCategoryPosition(uid, array, index1, index2) {
    try {
        const dashboardRef = doc(db, dashboard_coll, uid);
        array.splice(index2, 1, array.splice(index1, 1, array[index2])[0])
        await updateDoc(dashboardRef, {
            categories: array
        });

        console.log("Category positions updated successfully.");
        return true;
    } catch (e) {
        console.error("Error updating category positions: ", e);
        return false;
    }
}