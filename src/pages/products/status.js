import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

const ProductStatus = ({ prod }) => {
    return (
        <div style={styles.status(prod.available)}>
            {prod.available ? (
                <>
                    <FaCheckCircle style={styles.icon} />
                    Available
                </>
            ) : (
                <>
                    <FaTimesCircle style={styles.icon} />
                    Unavailable
                </>
            )}
        </div>
    );
};

const styles = {
    status: (available) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: available ? '#007bff' : '#dc3545',
        color: 'white',
        padding: '3px ',
        borderRadius: '20px',
        textAlign: 'center',
        fontWeight: '600',
        textTransform: 'capitalize',
        fontSize: '14px', // Adjust font size for better readability
        transition: 'all 0.3s ease', // Smooth transition effect when status changes
    }),
    icon: {
        marginRight: '8px',
        fontSize: '16px', // Slightly bigger icons for better visibility
    },
};

export default ProductStatus;
