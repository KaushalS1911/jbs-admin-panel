import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import Index from 'views/Fees/Index';
import Mainbreadcrumbs from 'contants/Mainbreadcrumbs';

// ==============================|| TYPOGRAPHY ||============================== //

const Fees = () => (
  <>
  <Mainbreadcrumbs title={"Fees"} />
  <MainCard secondary={<SecondaryAction />}>
    <Index />
  </MainCard>
  </>
);

export default Fees;
