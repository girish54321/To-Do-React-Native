

import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, Button, Card } from 'react-native-paper';
import SizedBox from '../../components/SizedBox';
import useCreateToDo from './userCreateToDoScreen';
import { Todo } from '../../models/responseType/UserListResponse';
import { useRoute } from '@react-navigation/native';
import ToDoStatusView from '../../components/todoStatusVIew/ToDoStatusView';

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
        updateToDoStatus,
        fileUri,
        pickSingleImage,
    } = useCreateToDo(data);

    useEffect(() => {
        navigation.setOptions({ title: data ? 'Update ToDo' : 'Create ToDo' });
    },);

    return (
        <KeyboardAwareScrollView
            style={styles?.rootView}
        >
            <Card style={styles.cardView}>
                <TouchableOpacity onPress={pickSingleImage}>
                    <Card.Cover source={fileUri?.uri ? { uri: fileUri?.uri } : require('../../assets/icons/attached-file.png')} resizeMode="center" />
                </TouchableOpacity>
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
            <ToDoStatusView state={todoData.state} updateToDoStates={updateToDoStatus} />
            <SizedBox size={16} />
            <Button
                onPress={data ? updateToDo : createToDo}
                mode="contained"
            >
                {data ? 'Update ToDo' : 'Create ToDo'}
            </Button>
            <SizedBox size={16} />
        </KeyboardAwareScrollView>
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

