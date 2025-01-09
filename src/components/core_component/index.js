// components/core_component/index.js
import { useState, useEffect } from 'react';
export function Table({ headers, data, onClick, style, children }) {
  return (
    <div className={`core_table ${style}`}>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={onClick ? 'cursor-pointer' : ''} >
          {children}
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => onClick(rowIndex)}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table >
    </div>
  );
}

export function Modal({ title, children, show, onClose }) {
  if (!show) return null;

  return (
    <div className="core_modal">
      <div className="core_modal__inner">
        <div className="core_modal__header">
          {title}
          <img
            src="/images/icons/close.svg"
            className="w-4 h-4 cursor-pointer"
            alt="Close"
            onClick={onClose} // Gọi hàm onClose từ cha
          />
        </div>
        <div className="core_modal__content">
          {children}
        </div>
      </div>
      <div className="core_modal__bg" onClick={onClose}></div>
    </div>
  );
}