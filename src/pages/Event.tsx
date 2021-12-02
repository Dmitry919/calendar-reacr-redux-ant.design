import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EvenCalendar from "../components/EvenCalendar";
import EventForm from "../components/EventForm";
import {useAction} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../model/IEvent";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvent} = useAction()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }

    useEffect(() => {
        fetchGuests()
        fetchEvent(user.username)
    }, [])

    const showModal = () => {
        setModalVisible(true)
    }
    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <Layout>
            <EvenCalendar events={events}/>
            <Row
                justify='center'
            >
                <Button
                    onClick={showModal}
                >
                    Добывить событие
                </Button>
            </Row>
            <Modal
                title='Добавить событие'
                centered
                footer={[null]}
                visible={modalVisible}
                onCancel={handleCancel}
            >
                <EventForm
                    guests={guests} submit={addNewEvent} />
            </Modal>
        </Layout>
    );
};

export default Event;