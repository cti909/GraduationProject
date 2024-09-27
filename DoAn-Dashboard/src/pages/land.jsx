import { Helmet } from 'react-helmet-async';

import { LandView } from 'src/sections/land/view/land-view';

// ----------------------------------------------------------------------

export default function PlantPage() {
  return (
    <>
      <Helmet>
        <title> Land </title>
      </Helmet>

      <LandView />
    </>
  );
}
