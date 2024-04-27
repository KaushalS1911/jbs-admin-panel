import MainCard from 'ui-component/cards/MainCard';
import Index from 'views/Fees/Index';
import Mainbreadcrumbs from 'contants/Mainbreadcrumbs';
const Fees = () => (
  <>
  <Mainbreadcrumbs title={"Fees"} />
  <MainCard>
    <Index />
  </MainCard>
  </>
);

export default Fees;
