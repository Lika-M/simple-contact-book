import { useState, useEffect } from "react";

export const useFormControl = (contact, isEdit) => {
    const [data, setData] = useState({});
   
    useEffect(() => {
        if (isEdit) {
            setData(contact);
        } else if (!isEdit) {
            setData({
                firstName: '',
                lastName: '',
                picture: '',
                email: '',
                phone: ''
            });
        }
    }, [isEdit, contact]);

    return [data, setData]
}