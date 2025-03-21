import {Modal} from "antd"
import React from "react"

const DeleteModal=({isModalOpen,handleOk,handleCancel,text})=>{
    return(
        <Modal
        title={text}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <p>Do you want to delete this item</p>
        </Modal>
    )
}

export default DeleteModal;