import React, {useState} from 'react';
import { Button, Modal } from 'antd';

const QrCode = () => {
    const [modal2Open, setModal2Open] = useState(false);
    return (
        <>
    <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
    </Button>
    <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
        width={1000}
    >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
    </Modal>
        </>
    );
};

export default QrCode;