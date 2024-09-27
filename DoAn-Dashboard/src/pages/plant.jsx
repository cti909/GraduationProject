import { Helmet } from 'react-helmet-async';

import { PlantView } from 'src/sections/plant/view/plant-view';

import { UserView } from 'src/sections/user/view/user-view';

// ----------------------------------------------------------------------

export default function PlantPage() {
  return (
    <>
      <Helmet>
        <title> Plant </title>
      </Helmet>

      <PlantView />
    </>
  );
}
