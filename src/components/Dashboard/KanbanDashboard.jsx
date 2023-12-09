//Importing React, Redux hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";

//Dnd kit imports
import { DndContext, DragOverlay, PointerSensor, closestCorners, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

// Mui imports
import {
    Box,
} from '@mui/material'

//Component imports
import CategoryContainer from "./CategoryContainer";
import { getJobData } from "./randomJob";
import { categories } from "../../constants";
import { createPortal } from "react-dom";
import JobCard from "./JobCard";
import { doneAddJob, doneEditJob } from "../../actions";

export const KanbanDashboard = () => {

    const dispatch = useDispatch()
    const newJob = useSelector(state => state.new_job)

    useEffect(() => {
        if(newJob.id){
            console.log(newJob)
            let job = {id: newJob.id, company: newJob.company, position: newJob.position, category: newJob.category}
            setJobs([...jobs, job])
            dispatch(
                doneAddJob()
            )    
        }
    }, [newJob])

    const editedJob = useSelector(state => state.edited_job)
    useEffect(() => {
        if(editedJob.id){
            console.log(editedJob)

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
            dispatch(
                doneEditJob()
            )
        }
    })

    const [jobs, setJobs] = useState(getJobData(30))

    const [columns, setColumns] = useState(categories)

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

    function handleDragEnd(event){
        setActiveColumnName("")
        setActiveCardData("")

        const {active, over} = event
        if(!over) return;

        const activeColumn = active.id
        const overColumn = over.id

        if(activeColumn === overColumn) return

        setColumns((col) => {
            const activeColumnIndex = col.findIndex(
                c => c === activeColumn
            )
            const overColumnIndex = col.findIndex(
                c => c === overColumn
            )

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })

    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleOnDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={rectIntersection}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '85vh'}}>
                <SortableContext items={columns}>
                    {columns.map((category, index) => (
                        <CategoryContainer key={index} category={category} allJobs={jobs}/>
                    ))}
                </SortableContext>
            </Box>

            {createPortal(
                <DragOverlay>
                    {activeColumnName && 
                        <CategoryContainer category={activeColumnName} allJobs={jobs}/>
                    }
                    {activeCardData &&
                        <JobCard id={activeCardData.id} position={activeCardData.position} company={activeCardData.company} category={activeCardData.category}/>
                    }
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
}