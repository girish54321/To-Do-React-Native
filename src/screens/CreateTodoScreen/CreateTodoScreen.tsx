

import React, { useEffect } from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import SizedBox from '../../components/SizedBox';
import useCreateToDo from './userCreateToDoScreen';
import { Todo } from '../../models/responseType/UserListResponse';
import { useRoute } from '@react-navigation/native';

export const CreateTodoScreen = ({ navigation }: {
    navigation: any
}) => {
    const route = useRoute();
    const data: Todo = route?.params?.data;

    const { todoData,
        onTitleChange,
        onBodyChange,
        updateToDo,
        createToDo,
    } = useCreateToDo(data);

    useEffect(() => {
        navigation.setOptions({ title: data ? 'Update ToDo' : 'Create ToDo' });
    },);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles?.rootView}
        >
            <Card style={styles.cardView}>
                <TextInput
                    label="Title"
                    mode="outlined"
                    value={todoData.title}
                    onChangeText={onTitleChange}
                    autoCapitalize="none"
                    placeholder="Title"
                    style={styles.textInputStyle}
                />
                <TextInput
                    label="Body"
                    placeholder="Body"
                    value={todoData.body}
                    onChangeText={onBodyChange}
                    mode="outlined"
                    autoCapitalize="none"
                    style={styles.textInputStyle}
                />
            </Card>
            <SizedBox size={16} />
            <Button
                onPress={data ? updateToDo : createToDo}
                mode="contained"
            >
                {data ? 'Update ToDo' : 'Create ToDo'}
            </Button>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    textInputStyle: {
        marginVertical: 7,
    },
    rootView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cardView: {
        padding: 12, marginTop: 16,
    },
    rootViewTwo: {
        flex: 1,
    },
    loginView: { flex: 1, marginHorizontal: 22 },
});

