
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface ProfileFormActionsProps {
  isSubmitting?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  hasNextStep?: boolean;
}

const ProfileFormActions: React.FC<ProfileFormActionsProps> = ({
  isSubmitting = false,
  onNext,
  onBack,
  isLastStep = false,
  hasNextStep = false
}) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/profiles');
  };
  
  return (
    <div className="flex justify-between pt-6">
      <Button 
        type="button"
        variant="outline"
        onClick={onBack || handleCancel}
      >
        {onBack ? 'Back' : 'Cancel'}
      </Button>
      
      <div className="flex gap-2">
        {!isLastStep && hasNextStep && (
          <Button type="button" onClick={onNext} disabled={isSubmitting}>
            Next
          </Button>
        )}
        
        {isLastStep && (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        )}
        
        {!hasNextStep && !isLastStep && (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileFormActions;
