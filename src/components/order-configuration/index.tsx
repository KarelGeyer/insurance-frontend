import { useSelector } from "react-redux";
import { ProductCategory } from "../../helpers/enums";
import ProductDetailWrapper from "../Section";
import LifeInsuranceConfig from "./LifeInsuranceConfig";
import PensionConfig from "./PensionConfig";
import PropertyInsuranceConfig from "./PropertyInsuranceConfig";
import { RootState } from "../../state/redux/store";

interface IProps {
  setYearlyPrice: (value: number) => void;
}

const OrderConfiguration = ({ setYearlyPrice }: IProps) => {
  const { productCategory } = useSelector((state: RootState) => state.product);

  return (
    <ProductDetailWrapper marginTop={5}>
      {productCategory === ProductCategory.LIFE_INSURANCE && (
        <LifeInsuranceConfig setYearlyPrice={setYearlyPrice} />
      )}
      {productCategory === ProductCategory.PROPERTY_INSURANCE && (
        <PropertyInsuranceConfig setYearlyPrice={setYearlyPrice} />
      )}
      {productCategory === ProductCategory.PENSION && (
        <PensionConfig setYearlyPrice={setYearlyPrice} />
      )}
    </ProductDetailWrapper>
  );
};

export default OrderConfiguration;
