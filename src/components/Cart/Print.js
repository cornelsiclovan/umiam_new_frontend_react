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

const Print = (props) => {
  let _inch = 2;
  let rotation = 3;
  let issueID = 1;

  console.log(props.order.order.table_id);

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

    const totalcinciprocente = Math.round(+props.order.order.total / 20 + Number.EPSILON) + +props.order.order.total;;
    const totalzeceprocente =  Math.round(+props.order.order.total / 10 + Number.EPSILON) + +props.order.order.total;
    const totalcinspeprocente = Math.round(+props.order.order.total / 100 * 15 + Number.EPSILON) + +props.order.order.total;;

    if (_inch == 2) {
      // 2inch sample
      setWidth(380);

      let receiptLength = 600 + 40 * props.cartItems.length;


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
        "Data si ora:" + props.order.order.createdAt.split("T")[0] +  "   "  + new Date(new Date().getTime()).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: true }),
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
        "---------------------------------------------",
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
        const textString =
          element.title.substring(0, 20) + completeString + "    " +
          element.price + " x " +
          element.cartItem.quantity +
          "     " +
          element.price * element.cartItem.quantity +
          " RON";
        drawDeviceFont(textString, 0, y, "0", 1, 2, 0, 0, 0, 0);


        y = y + 30;
      });
      drawDeviceFont(
        "---------------------------------------------",
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
        "Total: " + props.order.order.total + " RON",
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
          Math.round(+props.order.order.total / 20 + Number.EPSILON) +
          ")" +
          "  RON TOTAL: " +
          totalcinciprocente,
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
          Math.round(+props.order.order.total / 10 + Number.EPSILON) +
          ")" +
          " RON TOTAL: " +
          totalzeceprocente,
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
          Math.round((+props.order.order.total / 100) * 15 + Number.EPSILON) +
          ")" +
          " RON TOTAL: " +
           +totalcinspeprocente,
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

  return (
    <React.Fragment>
      <a
        href=""
        style={{
          backgroundColor: "yellowgreen",
          color: "white",
          textDecoration: "none",
          padding: 3 + "px",
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

export default Print;
