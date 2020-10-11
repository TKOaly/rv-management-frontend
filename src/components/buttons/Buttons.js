import './styles/Buttons.scss';
import React from 'react';

export const BasicBtn = ({ onClick, children, small, ...props }) => {
    const className = 'btn' + (small ? ' btn-small' : '');

    return (
        <button {...props} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export const SuccessBtn = ({ onClick, children, small, ...props }) => {
    const className = 'btn btn-success' + (small ? ' btn-small' : '');

    return (
        <button {...props} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export const DangerBtn = ({ onClick, children, small, ...props }) => {
    const className = 'btn btn-danger' + (small ? ' btn-small' : '');

    return (
        <button {...props} onClick={onClick} className={className}>
            {children}
        </button>
    );
};
