import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { tourSteps } from './TourSteps';

const TourProvider = () => {
  const { runTour, setRunTour, tourStepIndex, setTourStepIndex, showToast } = useOnboarding();

  const handleJoyrideCallback = (data) => {
    const { status, type, index } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      setTourStepIndex(0);
      
      if (status === STATUS.FINISHED) {
        showToast("Tour Completed!", "You have explored the main navigation systems.", "success");
      }
    } else if (type === 'step:after' || type === 'target:not_found') {
      // Move to next step or handle click next
      setTourStepIndex(index + (type === 'target:not_found' ? 1 : 1));
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={runTour}
      stepIndex={tourStepIndex}
      callback={handleJoyrideCallback}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      locale={{
        last: 'Finish Tour',
        skip: 'Skip'
      }}
      styles={{
        options: {
          arrowColor: '#ffffff',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(15, 23, 42, 0.4)',
          primaryColor: '#2563eb', // Brand Blue
          textColor: '#334155', // slate-700
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0',
          fontFamily: 'Inter, sans-serif',
        },
        tooltipTitle: {
          color: '#0f172a', // slate-900
          fontWeight: 700,
          fontSize: '14px',
          marginBottom: '8px',
        },
        tooltipContent: {
          fontSize: '12px',
          lineHeight: '1.6',
          color: '#475569', // slate-600
        },
        buttonNext: {
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 600,
          padding: '8px 12px',
          outline: 'none',
        },
        buttonBack: {
          color: '#64748b',
          fontSize: '11px',
          fontWeight: 600,
          marginRight: '12px',
        },
        buttonSkip: {
          color: '#94a3b8',
          fontSize: '11px',
          fontWeight: 500,
        }
      }}
    />
  );
};

export default TourProvider;
export { TourProvider };
