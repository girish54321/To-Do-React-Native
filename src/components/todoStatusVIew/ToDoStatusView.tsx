
import React from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { StyleSheet } from 'react-native';
const ToDoStatusView = ({ state, updateToDoStates }) => {
    return (
        <SegmentedButtons
            value={state}
            style={styles.marginTopValue}
            onValueChange={updateToDoStates}
            buttons={[
                {
                    icon: 'stop-circle-outline',
                    value: 'pending',
                    label: 'Pending',
                },
                {
                    icon: 'check',
                    value: 'in-progress',
                    label: 'In Progress',
                },
                {
                    value: 'completed', label: 'Completed',
                    icon: 'check-all',

                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    marginTopValue: {
        marginTop: 12,
    },
});

export default ToDoStatusView;
