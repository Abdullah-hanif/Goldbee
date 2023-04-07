import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../constants/colors'
import TextField from '../../components/TextField'
import Buttons from '../../components/Buttons'
import { Checkbox, TextInput } from 'react-native-paper'
import Back from 'react-native-vector-icons/AntDesign'
// @API_Callefef
import { Base_Url } from '../../api/Api'

// @LANGUGE IMPORTSsef
import { useTranslation } from 'react-i18next'
import Toast from '../../components/Toast'
import DescriptionBox from "../../components/DescriptionBox"
function ContactUs({navigation}) {
    const [checked, setChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [togglePassword, setTogglePassword] = useState(true)
    const [Loading, setLoading] = useState(false)


    const { t } = useTranslation()
    return (
        <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back name="left" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ marginTop: '15%' }}>
                <Text style={{ fontWeight: 'bold', color: Color.black, fontSize: 28 }}>
                    {t('common:contactus')}
                </Text>

                <View style={{ marginTop: 20 }}>
                    <TextField
                        setTxt={txt => setName(txt)}
                        placeHolder={t('common:yourname')}
                    />
                    <View style={{ position: 'relative' }}>
                        <TextField
                            setTxt={txt => setEmail(txt)}
                            placeHolder={t('common:email')}
                        />


                    </View>
                    <View style={{ position: 'relative' }}>
                        <TextField
                            setTxt={txt => setSubject(txt)}
                            placeHolder={t('common:subject')}
                        />

                    </View>
                    <View style={{ marginTop: '3%' }}>
                        <DescriptionBox placeHolder={t('common:message')} />
                    </View>

                </View>

                <View
                    style={{
                        marginTop: '10%',
                    }}>
                    <View>
                        <Buttons name={Loading ?
                            <>
                                <TouchableOpacity disabled style={styles.containe11}>
                                    <ActivityIndicator size={20} color={Color.yellow} />
                                </TouchableOpacity>
                            </> :
                            t('common:submit')} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default ContactUs;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.splashWhite,
        padding: 20,
    },
    txtContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 120,
        marginTop: 10,
        padding: 15,
        color: 'black',
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },
})


