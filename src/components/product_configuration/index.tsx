import Validator from "../../helpers/Validator";
import { ProductCategory } from "../../helpers/enums";
import ProductDetailWrapper from "../Section";
import LifeInsuranceConfig from "./LifeInsuranceConfig";
import PensionConfig from "./PensionConfig";
import PropertyInsuranceConfig from "./PropertyInsuranceConfig";

interface IProps {
  category: ProductCategory;
  shouldSubmit: boolean;
  setConfigValid: (isValid: boolean) => void;
}

const ProductConfiguration = ({
  category,
  shouldSubmit,
  setConfigValid,
}: IProps) => {
  return (
    <>
      <ProductDetailWrapper marginTop={5}>
        {category === ProductCategory.LIFE_INSURANCE && (
          <LifeInsuranceConfig shouldSubmit={shouldSubmit} />
        )}
        {category === ProductCategory.PROPERTY_INSURANCE && (
          <PropertyInsuranceConfig setIsValid={setConfigValid} />
        )}
        {category === ProductCategory.PENSION && (
          <PensionConfig setIsValid={setConfigValid} />
        )}
      </ProductDetailWrapper>
    </>
  );
};

export default ProductConfiguration;
