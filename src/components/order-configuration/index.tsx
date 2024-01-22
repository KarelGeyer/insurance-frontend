import { ProductCategory } from "../../helpers/enums";
import ProductDetailWrapper from "../Section";
import LifeInsuranceConfig from "./LifeInsuranceConfig";
import PensionConfig from "./PensionConfig";
import PropertyInsuranceConfig from "./PropertyInsuranceConfig";

interface IProps {
  category: ProductCategory;
  shouldSubmit: boolean;
}

const OrderConfiguration = ({ category }: IProps) => {
  return (
    <ProductDetailWrapper marginTop={5}>
      {category === ProductCategory.LIFE_INSURANCE && <LifeInsuranceConfig />}
      {category === ProductCategory.PROPERTY_INSURANCE && (
        <PropertyInsuranceConfig />
      )}
      {category === ProductCategory.PENSION && <PensionConfig />}
    </ProductDetailWrapper>
  );
};

export default OrderConfiguration;
