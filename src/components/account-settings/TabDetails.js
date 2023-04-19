import CardContent from '@mui/material/CardContent';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import WorkExperience from './WorkExperience';
import { useState } from 'react';
import Loader from '../container/Loader';

const TabDetails = () => {
  const [loading, setLoading] = useState(false);
  // ** State

  return (
    <CardContent>
      <Loader isLoading={loading}>
        <SkillsSection setLoading={setLoading} />
        <EducationSection setLoading={setLoading} />
        <WorkExperience setLoading={setLoading} />
      </Loader>
    </CardContent>
  );
};

export default TabDetails;
