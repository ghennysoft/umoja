import { useState, useEffect } from "react";

interface Operator {
    id: number
    name: string
    image: string
}

export const useOperator = (phoneNumber: string) => {
    const [operator, setOperator] = useState<Operator | null>(null);

    const operators = {
        'vodacom': {
            'id': 1,
            'name': 'MPESA',
            'image': 'operators/vodacom.png',
        },
        'orange': {
            'id': 2,
            'name': 'ORANGE',
            'image': 'operators/orange.png',
        },
        'airtel': {
            'id': 3,
            'name': 'AIRTEL',
            'image': 'operators/airtel.png',
        },
    }

    const vodacomIndicator = [81,82,83,86];
    const orangeIndicator = [84,85,89];
    const airtelIndicator = [99,98,97,96];

    useEffect(() => {
        // Check if phone number is valid and has at least 2 digits
        if(!phoneNumber || phoneNumber.length < 2) {
            setOperator(null);
            null;
        }

        // Get the firt 2 digits of indicator
        const indicator = parseInt(phoneNumber.slice(0,2));

        if(vodacomIndicator.includes(indicator)){
            setOperator(operators.vodacom);
        }else if(orangeIndicator.includes(indicator)){
            setOperator(operators.orange);
        }else if(airtelIndicator.includes(indicator)){
            setOperator(operators.airtel);
        }else{
            setOperator(null);
        } 
    }, [phoneNumber]);

    return operator;
}
