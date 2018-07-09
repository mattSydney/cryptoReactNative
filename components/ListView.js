/* @flow */

import React, { Component } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import ListViewItemVote from "./ListViewItemVote";
import Colors from "../constants/Colors";

const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
	}
 
const ListView = (props) => {
		return (
			<View style={styles.container}>
				<FlatList
					ItemSeparatorComponent={ FlatListItemSeparator }
					data={props.data}
					renderItem={({ item, index }) => (
						<ListViewItemVote 
							id={index}
							coinName={item.coinName} 
							symbol={item.symbol}
							priceUsd={item.priceUsd}
							onGoalDeleteHandler = {props.onGoalDeleteHandler}
						/>
					)}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
  }


const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: Colors.mainColor,
	},
	
});

export default ListView;
