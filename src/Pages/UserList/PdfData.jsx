import React from 'react';
import {
    Page,
    Text,
    Document,
    StyleSheet,
    View,
    Font,
} from "@react-pdf/renderer";

Font.register({
    family: "AntonFamily",
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    text: {
        margin: 4,
        fontSize: 12,
        textAlign: "justify",
        textDecoration: "dot",
        borderBottomStyle: "dotted",
        borderBottomWidth: 1,
        borderBottomColor: "#888888",
    },
    textHead: {
        margin: 4,
        fontSize: 13,
        textAlign: "justify",
        textDecoration: "underline",
    },
    commitment: {
        margin: 4,
        fontSize: 12,
        textAlign: "justify",
        marginBottom: 20,
    },
    image: {
        margin: 4,
        height: 130,
        width: 110,
    },
    header: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: "center",
        color: "black",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
        padding: 4,
    },
});

const PdfData = ({ data, userPayments, totalGive, totalGot, prevJer }) => {
    console.log("Data=", data);

    return (
        <Document>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.textHead}>Product Details:</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Date</Text>
                        <Text style={styles.tableCell}>Give</Text>
                        <Text style={styles.tableCell}>Got</Text>
                    </View>
                    {userPayments.map((payment) => (
                        // Only render the table row if the date is valid
                        payment.currentDate && (
                            <View style={styles.tableRow} key={payment._id}>
                                <Text style={styles.tableCell}>{payment.currentDate}</Text>
                                <Text style={styles.tableCell}>{payment.give}</Text>
                                <Text style={styles.tableCell}>{payment.got}</Text>
                            </View>
                        )
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>PrevJer: {prevJer}</Text>
                        {/* <Text style={styles.tableCell} colSpan={4}>{prevJer}</Text> */}
                    </View>
                </View>
                <View>
                    <Text>Total Give: {totalGive + prevJer}</Text>
                    <Text>Total Got: {totalGot}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfData;
