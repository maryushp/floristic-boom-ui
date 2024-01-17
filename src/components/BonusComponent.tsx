import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Input} from "reactstrap";
import {Bonus} from "../utils/types";
import {findBonusByCode} from "../utils/bonusUtils";
import {isAxiosError} from "axios";

type BonusComponentProps = {
    setBonus: (bonus: Bonus) => void
}

const BonusComponent = (props: BonusComponentProps) => {
    const {setBonus} = props
    const [providedBonus, setProvidedBonus] = useState<Bonus>()
    const [providedBonusCode, setProvidedBonusCode] = useState("")
    const [showBonusDialog, setShowBonusDialog] = useState(false)
    const [isBonusCodeIncorrect, setIsBonusCodeIncorrect] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setError('')
        setIsBonusCodeIncorrect(false)
    }, [providedBonusCode])

    useEffect(() => {
        if (providedBonus) {
            handleCloseBonusDialog()
        }
    }, [providedBonus]);

    const handleBonusEntered = async () => {
        if (providedBonusCode.trim() === '') {
            setError('Bonus code shouldn\'t be blank!')
            setIsBonusCodeIncorrect(true)
        } else {
            try {
                setError('')
                const result = await findBonusByCode(providedBonusCode)
                setBonus(result)
                setProvidedBonus(result)
            } catch (e) {
                if (isAxiosError(e)) {
                    setError('Invalid bonus code')
                    setIsBonusCodeIncorrect(true)
                }
            }
        }
    }

    const handleShowBonusDialog = () => {
        setError('')
        setIsBonusCodeIncorrect(false)
        setProvidedBonusCode('')
        setShowBonusDialog(true)
    }
    const handleCloseBonusDialog = () => {
        setShowBonusDialog(false)
        setIsBonusCodeIncorrect(false)
    }

    return (
        <div>
            <div className="d-flex flex-column align-items-center mt-5 gap-2">
                {providedBonus ?
                    (<h4 className="fw-bold text-center text-success">Bonus Code Activated!</h4>)
                    :
                    (<>
                        <h4 className="fw-bold text-center">Are you a Loyalty Program member?</h4>
                        <Button variant="success" className="rounded-4 fw-bold" onClick={handleShowBonusDialog}>ENTER BONUS CODE</Button>
                    </>)
                }
            </div>

            <Modal show={showBonusDialog} onHide={handleCloseBonusDialog} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Enter bonus code:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        className={isBonusCodeIncorrect ? `rounded-4 border border-danger border-2`: `rounded-4`}
                        placeholder="Bonus code"
                        onChange={(e) => setProvidedBonusCode(e.target.value)}
                        value={providedBonusCode}
                    />
                </Modal.Body>
                <Modal.Footer className="justify-content-center d-flex flex-column">
                    <Button variant="success rounded-4" onClick={handleBonusEntered}>
                        Confirm
                    </Button>
                    {isBonusCodeIncorrect ?
                        (<h5 className="text-danger mt-3">{error}</h5>)
                        :
                        (<></>)
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BonusComponent;