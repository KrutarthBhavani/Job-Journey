import { useState } from "react";
import { useSelector } from "react-redux";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import {
    Box,
    Card
} from '@mui/material'

export const KanbanDashboard = () => {
    


    return (
        <DndContext
        collisionDetection={rectIntersection}
        onDragEnd>

        </DndContext>
    )
}