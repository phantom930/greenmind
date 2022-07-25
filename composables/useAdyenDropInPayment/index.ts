/* eslint-disable no-prototype-builtins */
import { ref, Ref } from '@nuxtjs/composition-api';

export interface IUseAdyenDropInPayment {
  transaction: Ref<any>;
  openAdyenTransaction: () => any;
}

const useAdyenDropInPayment = (): IUseAdyenDropInPayment => {

  const transaction = ref({});

  const openAdyenTransaction = () => {
    //
  };

  return {
    transaction,
    openAdyenTransaction
  };
};

export default useAdyenDropInPayment;
