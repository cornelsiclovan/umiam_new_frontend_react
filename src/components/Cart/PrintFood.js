import React, { useEffect, useState } from "react";
import {
  clearBuffer,
  setLabelId,
  setWidth,
  drawDeviceFont,
  draw1DBarcode,
  drawBlock,
  drawVectorFont,
  printBuffer,
  getLabelData,
  setLength,
} from "./bxllabel";

import { cutPaper, printText } from "./bxlpos";

import { requestPrint, viewResult } from "./bxlcommon.js";

const PrintFood = (props) => {
  let _inch = 2;
  let rotation = 3;
  let issueID = 1;



  const changeLabelInch = () => {
    _inch = 2;
  };

  const viewResult = (result) => {
    _inch = 2;
  };

  const PrintLabel = (e) => {
    e.preventDefault();

    setLabelId(issueID);
    clearBuffer();

   

    if (_inch == 2) {
      // 2inch sample
      setWidth(380);

      let receiptLength = 600 + 38 * props.cartItems.length;


      setLength(receiptLength, 0, "C", 0);
      //   drawDeviceFont(
      //     "ciorba de burta x 3         70 ron",
      //     0,
      //     50,
      //     "0",
      //     1,
      //     2,
      //     0,
      //     0,
      //     0,
      //     0
      //   );

      let y = 100;

	  drawDeviceFont(
        "Data si ora:" + new Date(new Date().getTime()).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: true }),
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

	  y = y + 50

      drawDeviceFont(
        "---------------------------------------",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

       y = y + 30;
     

      props.cartItems.forEach((element) => {
        let completeString = "";
        if(element.title.length < 20) {
           completeString = " ".repeat(20 - element.title.length);
        }
        if(element.title.length < 20 && (element.title === "Pastrav" || element.title === "Somon")) {
          completeString = " ".repeat(16 - element.title.length)
        }
        const textString =
          element.title.substring(0, 30) + completeString + " x " +
          element.cartItem.quantity 
        
        drawDeviceFont(textString, 0, y, "0", 1, 2, 0, 0, 0, 0);


        y = y + 30;
      });
      drawDeviceFont(
        "---------------------------------------",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

      y = y + 25;

      drawDeviceFont(
        "Total: " + + " RON",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

      y = y + 35;

      drawDeviceFont(
        "[] bacsis 5 % " +
          "(" +
         
          ")" +
          "  RON TOTAL: " ,
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );
      y = y + 35;

      drawDeviceFont(
        "[] bacsis 10 % " +
          "(" +
          
          ")" +
          " RON TOTAL: ",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );
      y = y + 35;
      drawDeviceFont(
        "[] bacsis 15 % " +
          "(" +
       
          ")" +
          " RON TOTAL: ",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );
      y = y + 35;
      drawDeviceFont(
        "[] bacsis alta suma: __________________",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

      y = y + 45;
      drawDeviceFont(
        "Nu inlocuieste bonul fiscal",
        0,
        y,
        "0",
        1,
        2,
        0,
        0,
        0,
        0
      );

      //draw1DBarcode("1234567890",10,180,1,3,2,96,0,3);
      //drawBlock(10,60,350,160,"B",5);
      //drawVectorFont("Vector Font",10,350,"U",40,40,0,0,1,0,0,0,false);
    } else if (_inch == 3) {
      // 3inch sample
      setWidth(576);
      drawDeviceFont("1234567890", 10, 15, "0", 2, 2, 0, 0, 0, 0);

      drawDeviceFont("Sample", 10, 40, "2", 4, 4, 0, 0, 1, 0);
      draw1DBarcode("1234567890", 10, 180, 1, 3, 2, 96, 0, 3);
      drawBlock(10, 60, 556, 170, "B", 5);
      drawVectorFont(
        "Vector Font",
        10,
        350,
        "U",
        40,
        40,
        0,
        0,
        1,
        0,
        0,
        0,
        false
      );
    } else if (_inch == 4) {
      // 4inch sample
      setWidth(832);
      drawDeviceFont("1234567890", 10, 15, "0", 2, 2, 0, 0, 0, 0);

      drawDeviceFont("Sample", 10, 40, "2", 4, 4, 0, 0, 1, 0);
      draw1DBarcode("1234567890", 10, 180, 1, 3, 2, 96, 0, 3);
      drawBlock(10, 60, 800, 170, "B", 5);
      drawVectorFont(
        "Vector Font",
        10,
        350,
        "U",
        40,
        40,
        0,
        0,
        1,
        0,
        0,
        0,
        false
      );
    } else {
      // error
      return;
    }

    printBuffer();

    var strSubmit = getLabelData();

    console.log(strSubmit);

    issueID++;
    requestPrint("Printer1", strSubmit, viewResult);
  };

  console.log("print food");

  return (
    <React.Fragment>
      <a
        href=""
        style={{
          backgroundColor: "yellowgreen",
          color: "white",
          textDecoration: "none",
          padding: 15 + "px",
          borderRadius: 5 + "px",
        }}
        id="print_bt"
        class="ripple"
        onClick={PrintLabel}
      >
        print
      </a>
    </React.Fragment>
  );
};

export default PrintFood;
