//Importing React, Redux hooks
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";

//Dnd kit imports
import { DndContext, DragOverlay, PointerSensor, closestCorners, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

// Mui imports
import {
    Box,
    Button,
    TextField,
    Divider,
    Container
} from '@mui/material'

//Component imports
import CategoryContainer from "./CategoryContainer";
import AddJobDialog from "./AddJobDialog";
import { getJobData } from "./randomJob";
import { createPortal } from "react-dom";
import JobCard from "./JobCard";

import { doneAddJob, doneEditJob, setBoardName, persistJobs, persistCategories } from "../../actions";
import { addAllJobs ,addJob, updateJob, getDashboardData, updateCategoryPosition } from "../../firebase/FirestoreFunctions";
import { AuthContext } from "../../context/AuthContext";

export const KanbanDashboard = () => {

    // const addRandomJobs = async () => {
    //     const jobs = getJobData(50)
    //     await addAllJobs(currentUser.uid, jobs)
    // }

    // useEffect(() => {
    //     addRandomJobs()
    // })

    const {currentUser} = useContext(AuthContext)
    const dispatch = useDispatch()

    const persistedJobs = useSelector(state => state.jobs)
    const persistedCategories = useSelector(state => state.categories)
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(
            persistJobs(jobs)
        )
    }, [jobs])

    useEffect(() => {
        dispatch(
            persistCategories(categories)
        )
    }, [categories])

    async function initializeJobs(){
        if(persistedCategories.length != 0 && persistJobs.length != 0){
            setCategories(persistedCategories)
            setJobs(persistedJobs)
            return
        }

        const dashboardData = await getDashboardData(currentUser.uid)

        if(dashboardData){
            const {name, categories, jobs: allJobs} = dashboardData
            setCategories([...categories])
            setJobs([...allJobs])
            dispatch(
                setBoardName(name)
            )
        }else{
            //TODO: Handle if dashboard data is not fetched
        }
    }

    useEffect(() => {
        initializeJobs()
    }, [])

    const [openDialog, setOpenDialog] = useState(false);

    const handleAddJobClick = () => {
        setOpenDialog(true);
    };

    const onDialogClosed = () =>{
        setOpenDialog(false)
    }

    const [filteredJobs, setFilteredJobs] = useState([])

    function onFilterCompany(text){
        if(text.length){
            const pattern = new RegExp(text, "i")
            setFilteredJobs(jobs.filter(job => job.company.match(pattern)))
        }else{
            setFilteredJobs([])
        }
    }

    const newJob = useSelector(state => state.new_job)

    useEffect(() => {
        addNewJob()
    }, [newJob])

    const addNewJob = async () => {
        if(newJob.id){
            console.log(newJob)
            const insertResult = await addJob(currentUser.uid, newJob)

            if(insertResult){
                setJobs([...jobs, newJob])
                if(filteredJobs.length) 
                    setFilteredJobs([])
                dispatch(
                    doneAddJob()
                )
            }else{
                //TODO: Show error 
            }
        }
    }

    const editedJob = useSelector(state => state.edited_job)
    useEffect(() => {
        editJob()
    }, [editedJob])

    async function editJob(){
        if(editedJob.id){
            console.log(editedJob)

            const updateResult = await updateJob(currentUser.uid, editedJob)

            if(updateResult){
                const jobIndex = jobs.findIndex(job => job.id === editedJob.id)
                if(jobIndex == -1){
                    console.log("ERROR: Cannot Edit Job with id " + editedJob.id)
                }
    
                // For Deletion
                if(editedJob.delete){
                    jobs.splice(jobIndex, 1)   
                }
                else jobs.splice(jobIndex, 1, editedJob)
    
                setJobs([...jobs])
    
                if(filteredJobs.length){
                    const jobIndex = filteredJobs.findIndex(job => job.id === editedJob.id)
                    if(jobIndex == -1){
                        console.log("ERROR: Cannot Edit Job with id " + editedJob.id)
                    }
    
                    if(editedJob.delete){
                        filteredJobs.splice(jobIndex, 1)   
                    }
                    else filteredJobs.splice(jobIndex, 1, editedJob)
    
                    setFilteredJobs([...filteredJobs])
                }
    
                dispatch(
                    doneEditJob()
                )
            }else{
                //TODO: Show error 
            }
        }
    }

    const [activeColumnName, setActiveColumnName] = useState("")
    const [activeCardData, setActiveCardData] = useState("")

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 25 //25px 
        }
    }

    ))

    function handleDragStart(event){
        console.log("DRAG START", event.active)
        if(categories.includes(event.active.id)){
            setActiveColumnName(event.active.id)
        }

        const jobIndex = jobs.findIndex(job => job.id === event.active.id)
        if(jobIndex !== -1){
            setActiveCardData(jobs[jobIndex])
        }
        return
    }

    function handleOnDragOver(event){
        const {active, over} = event
        if(!over) return;

        const activeId = active.id
        const overId = over.id

        if(activeId === overId) return

        const isActiveCard = active.data.current?.type === "job"
        const isOverCard = over.data.current?.type === "job"

        if(!isActiveCard) return
        
        if(isActiveCard && isOverCard){
            setJobs(jobs =>{
                const activeIndex = jobs.findIndex(j => j.id === activeId)
                const overIndex = jobs.findIndex(j => j.id === overId)

                if(jobs[activeIndex].category != jobs[overIndex].category)
                    jobs[activeIndex].category = jobs[overIndex].category

                return arrayMove(jobs, activeIndex, overIndex)
            })

            return
        }

        const isOverColumn = over.data.current?.type === "category"

        if(isActiveCard && isOverColumn){
            setJobs(jobs =>{
                const activeIndex = jobs.findIndex(j => j.id === activeId)
                const overCategory = over.id

                if(jobs[activeIndex].category != overCategory)
                    jobs[activeIndex].category = overCategory

                return arrayMove(jobs, activeIndex, activeIndex)
            })
        }
    }

    async function handleDragEnd(event){
        setActiveColumnName("")
        setActiveCardData("")
        
        const {active, over} = event
        if(!over) return;
        
        const isActiveCard = active.data.current?.type === "job"
        
        if(isActiveCard){
            const updatedJob = jobs.find(job => job.id == active.id)
            if(updatedJob){
                await updateJob(currentUser.uid, updatedJob)
            }
        }
        
        const activeColumn = active.id
        const overColumn = over.id

        if(activeColumn === overColumn) return

        const activeColIndex = categories.findIndex(c => c === activeColumn)
        const overColIndex = categories.findIndex(c => c === overColumn)
        
        setCategories(arrayMove(categories, activeColIndex, overColIndex))
        await updateCategoryPosition(currentUser.uid, [...categories], activeColIndex, overColIndex)
    }

    return (
        <Box>

            <Box display="flex" justifyContent="space-between" sx={{marginBottom: "10px"}}>
                <Button variant="contained" color="primary" size="small" onClick={handleAddJobClick}>
                    Add Job
                </Button>
                
                <Box display="flex" alignItems="center">
                    <TextField name="filterByCompany" variant="outlined" size="small" placeholder="Filter Company"
                        inputProps={{
                            style:{
                                padding: "5px",
                            }
                        }}
                        sx={{marginRight: "10px"}}
                        onChange={e => onFilterCompany(e.target.value)}/>

                    <Button variant="outlined" size="small">Sort By Created Date</Button>
                </Box>

                {openDialog && <AddJobDialog onCloseCallback={onDialogClosed} />}
            </Box>

            <Divider />
            <Container maxWidth={false} disableGutters sx={{overflow: 'scroll'}}>
                    <DndContext
                        sensors={sensors}
                        onDragStart={handleDragStart}
                        onDragOver={handleOnDragOver}
                        onDragEnd={handleDragEnd}
                        collisionDetection={rectIntersection}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '85vh'}}>
                            <SortableContext items={categories}>
                                {categories.map((category, index) => (
                                    <CategoryContainer key={index} category={category} allJobs={filteredJobs.length? filteredJobs: jobs}/>
                                ))}
                            </SortableContext>
                        </Box>

                        {createPortal(
                            <DragOverlay>
                                {activeColumnName && 
                                    <CategoryContainer category={activeColumnName} allJobs={filteredJobs.length? filteredJobs: jobs}/>
                                }
                                {activeCardData &&
                                    <JobCard jobData={activeCardData}/>
                                }
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>
                </Container>
        </Box>
    )
}