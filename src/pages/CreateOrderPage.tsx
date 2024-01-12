import React, {useState} from "react";
import "../styles/css/createOrderPage.css"
import {Button, Image} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Modal} from "react-bootstrap";
import {Input} from "reactstrap";

const CreateOrderPage = () => {
    const [bonusActivated, setBonusActivated] = useState(false)
    const [showBonusDialog, setShowBonusDialog] = useState(false);
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [incorrectBonusCode, setIncorrectBonusCode] = useState(false);

    const handleShowBonusDialog = () => setShowBonusDialog(true)
    const handleCloseBonusDialog = () => {
        setShowBonusDialog(false)
        setIncorrectBonusCode(false)
    }

    const handleShowAddressDialog = () => setShowAddressDialog(true)
    const handleCloseAddressDialog = () => setShowAddressDialog(false)

    return (
        <div className="order-page d-flex flex-column">
            <div className="d-flex flex-column align-items-center position-absolute confirmation-div">
                {bonusActivated ?
                    (<h2 className="text-success text-center fw-bold">120 ZL <del className="text-danger">240 ZL</del></h2>)
                :
                    (<h2 className="text-success text-center fw-bold">240 ZL</h2>)
                }
                <Button variant="success" className="rounded-4 fw-bold">CONFIRM</Button>
                {bonusActivated ?
                    (<h2 className="text-success text-center fw-bold mt-3">50% Discount</h2>)
                : (<></>)
                }
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4">
                <div className="border border-success border-2 d-flex flex-column align-items-center gap-2 rounded-4 p-3">
                    <Image src="logo_2.png" className="position-img"/>
                    <h4 className="text-center fw-bold text-capitalize">ROSES BOUQUET</h4>
                    <h5 className="text-center fw-bold">Amount: 1</h5>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-5 mt-5">
                <div className="border border-success border-2 d-flex flex-column gap-3 rounded-4 p-2">
                    <h4 className="text-center fw-bold text-capitalize">DELIVERY</h4>
                    <div className="fw-bold h5">
                        <Form.Check
                            type="radio"
                            label="Shop"
                            name="group-1"
                            className="mt-3"
                        />
                        <Form.Check
                            type="radio"
                            label="Delivery"
                            name="group-1"
                            className="mt-3"
                            checked={true}
                        />
                    </div>
                    <h4 className="text-center fw-bold">Address: Wroblewskiego 27</h4>
                    <Button variant="outline-success rounded-4 fw-bold" onClick={handleShowAddressDialog}>Edit Address</Button>
                </div>
                <div className="border border-success border-2 d-flex flex-column gap-3 rounded-4 p-2">
                    <h4 className="text-center fw-bold text-capitalize">PAYMENT</h4>
                    <div className="fw-bold h5">
                        <Form.Check
                            type="radio"
                            label="In the shop/To the courier"
                            name="group-2"
                            className="mt-3"
                        />
                        <Form.Check
                            type="radio"
                            label="Online"
                            name="group-2"
                            className="mt-3"
                            checked={true}
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center mt-5 gap-2">
                {bonusActivated ?
                    (<h4 className="fw-bold text-center text-success">Bonus Code Activated!</h4>)
                    :
                    (<>
                        <h4 className="fw-bold text-center">Are you a Loyalty Program member?</h4>
                        <Button variant="success" className="rounded-4 fw-bold" onClick={handleShowBonusDialog}>ENTER BONUS CODE</Button>
                    </>)
                }
            </div>

            <Modal show={showBonusDialog} onHide={handleCloseBonusDialog} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Enter bonus code:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input className={incorrectBonusCode ? `rounded-4 border border-danger border-2`: `rounded-4`}></Input>
                </Modal.Body>
                <Modal.Footer className="justify-content-center d-flex flex-column">
                    <Button variant="success rounded-4">
                        Confirm
                    </Button>
                    {incorrectBonusCode ?
                        (<h5 className="text-danger fw-bold mt-3">Incorrect bonus code!</h5>)
                        :
                        (<></>)
                    }
                </Modal.Footer>
            </Modal>

            <Modal show={showAddressDialog} onHide={handleCloseAddressDialog} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Enter new address:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">Street:</h4>
                    <Input className="rounded-4 border border-2"></Input>
                    <h4 className="text-center">House:</h4>
                    <Input className="rounded-4 border border-2"></Input>
                    <h4 className="text-center">Postal code:</h4>
                    <Input className="rounded-4 border border-2"></Input>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="success rounded-4">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default CreateOrderPage;