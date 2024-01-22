import Validator from "../../helpers/Validator";
import { ProductCategory } from "../../helpers/enums";
import ProductDetailWrapper from "../Section";
import LifeInsuranceConfig from "./LifeInsuranceConfig";
import PensionConfig from "./PensionConfig";
import PropertyInsuranceConfig from "./PropertyInsuranceConfig";

interface IProps {
  category: ProductCategory;
  shouldSubmit: boolean;
}

const ProductConfiguration = ({ category, shouldSubmit }: IProps) => {
  return (
    <ProductDetailWrapper marginTop={5}>
      {category === ProductCategory.LIFE_INSURANCE && (
        <LifeInsuranceConfig shouldSubmit={shouldSubmit} />
      )}
      {category === ProductCategory.PROPERTY_INSURANCE && (
        <PropertyInsuranceConfig shouldSubmit={shouldSubmit} />
      )}
      {category === ProductCategory.PENSION && (
        <PensionConfig
          validator={new Validator()}
          shouldSubmit={shouldSubmit}
        />
      )}
    </ProductDetailWrapper>
  );
};

export default ProductConfiguration;
