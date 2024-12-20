import React from 'react';
import { GestureResponderEvent } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { List, Divider, Checkbox } from 'react-native-paper';

interface listItemProps {
    name: string,
    email: string
    style?: any,
    isComplete?: boolean,
    onPress: (e: GestureResponderEvent) => void;
}

export const TodoListItem = (props: listItemProps) => {
    const { style, name, email, onPress, isComplete } = props;
    return (
        <Animatable.View animation="slideInDown" style={{ ...style }}>
            <List.Item
                onPress={onPress}
                title={name}
                description={email}
                right={props => <Checkbox
                    {...props}
                    status={isComplete ? 'checked' : 'unchecked'}
                    onPress={() => {
                    }}
                />}
            />
            <Divider />
        </Animatable.View>
    );
};

