import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaFire } from 'react-icons/fa';

function StreakContainer({ type, value, goal, unit }) {
  // Calculate progress percentage
  const progress = (value / goal) * 100;

  return (
    <Card className="text-center shadow">
      <Card.Body>
        <Card.Title className="mb-3">{type === 'daily' ? 'Daily Streak' : 'Weekly Streak'}</Card.Title>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <FaFire className="text-danger me-2" style={{ fontSize: '24px' }} />
          <span className="fw-bold">{value}</span>
          <span className="ms-1">{unit}</span>
        </div>
        <ProgressBar variant="danger" now={progress} label={`${progress}%`} className="mb-3" />
        <div className="text-muted">{`Goal: ${goal} ${unit}`}</div>
      </Card.Body>
    </Card>
  );
}

export default StreakContainer;
