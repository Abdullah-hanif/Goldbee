import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; import Toast from "../../components/Toast";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
;
const PaymentScreen = () => {
    const route = useRoute();
    const { productDetails } = route.params || {};
    const cNumber = Number(productDetails?.price) || [];

    const [cardNumber, setCardNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [month, setExpiryMM] = useState('');
    const [year, setExpiryYYYY] = useState('');
    const [cvc, setCVC] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!cardNumber || !fullName || !month || !cvc || !year) {
            // Handle form validation error, at least name and email should be filled
            Toast("Fill your complete card details")
            return;
        }
        try {
            const apiEndpoint = 'http://95.179.209.186/api/payment';
            const form = new FormData();
            form.append('cardNumber', cardNumber);
            form.append('fullName', fullName);
            form.append('month', month);
            form.append('year', year);
            form.append('cvv', cvc);
            form.append('user_id', productDetails?.user_id);
            form.append('listing_id', productDetails?.id);
            form.append('amount', cNumber);
            setLoading(true);
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: form,
            });
            const data = await response.json();
            if (data.status == 200) {
                // Request was successful

                // Process the response data as needed
                setLoading(false);
                Toast(data.message);
                setFullName({});
                setCVC({});
                setCardNumber({});
                setExpiryMM({});
                setExpiryYYYY({});
                setLoading(false);
               
            } else {

                // Request failed
                // const errorResponse = await response.json();
                // Handle the error response
                setLoading(false);
                Toast("Payment faild! somthing went wrong")
                setLoading(false)
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error:', error);
        }
    };
    return (
        <View style={styles.container}>

            <View style={{ alignSelf: 'center', marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>Accepted Cards</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                    <Image source={require('../../assets/Icons/visa.png')} style={{ width: 80, height: 80 }} />
                    <Image source={require('../../assets/Icons/mastercard-logo.png')} style={{ width: 80, height: 80 }} />
                </View>

            </View>
            <View style={{ marginTop: '10%' }}>
                <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: '600', color: 'black' }}>Fill card details</Text>
                <View style={{ marginTop: '5%' }}>
                    <TextInput
                        placeholder="Full name"
                        leftIcon={<Icon name="credit-card" size={24} color="black" />}
                        onChangeText={(text) => setFullName(text)}
                    />
                    <TextInput
                        placeholder="Card Number"
                        leftIcon={<Icon name="credit-card" size={24} color="black" />}
                        onChangeText={(text) => setCardNumber(text)}
                        value={cardNumber}
                        keyboardType="numeric"
                    />

                    <View style={styles.row}>
                        <TextInput
                            placeholder="MM"
                            leftIcon={<Icon name="calendar" size={24} color="black" />}
                            containerStyle={styles.inputContainer}
                            onChangeText={(text) => setExpiryMM(text)}
                            value={month}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="YYYY"
                            leftIcon={<Icon name="calendar" size={24} color="black" />}
                            containerStyle={styles.inputContainer}
                            onChangeText={(text) => setExpiryYYYY(text)}
                            value={year}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="CVC"
                            leftIcon={<Icon name="lock" size={24} color="black" />}
                            containerStyle={styles.inputContainer}
                            onChangeText={(text) => setCVC(text)}
                            value={cvc}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#006A4E', marginTop: '5%', height: '25%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', color: 'white' }}>    {loading ? <ActivityIndicator color="white" /> : ` ${"Pay now"} €: ${cNumber}`}</Text>
            </TouchableOpacity>
            {/* <Button
                title={  "Pay"}
                onPress={handleSubmit}
                buttonStyle={styles.button}
            /> */}
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
    },
})