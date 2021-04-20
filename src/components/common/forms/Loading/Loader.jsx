import * as React from "react";

import Loading from './Spin.gif'

const styles = {
  text: {
    marginTop: 52,
    color: "#888",
    marginLeft: 6,
  },
  spinner: {
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "#ffffffe6",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 99999999999999999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const Loader = ({
  loading,
  text = "Loading..",
  fullPage,
  containerStyle,
  textStyle
}) => {
  if (!loading) {
    return null;
  }
  const mergedContainerStyle = {
    ...styles.spinner,
    ...containerStyle,
    position: fullPage ? "fixed" : "absolute"
    
  };
  return (
    <div style={mergedContainerStyle}>
      <img src={Loading} width="100px" height="120px" atl="loading" />
      
      <div style={{fontSize:"16px"}}>{text}</div>

    </div>
  );
};

