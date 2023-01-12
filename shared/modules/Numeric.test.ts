import { BigNumber } from 'bignumber.js';
import { BN } from 'bn.js';
import { EtherDenomination } from '../constants/common';
import { Numeric } from './Numeric';

const ONE_ETH = new Numeric(1, 10, EtherDenomination.ETH);
const ONE_GWEI = new Numeric(1, 10, EtherDenomination.GWEI);
const ONE_WEI = new Numeric(1, 10, EtherDenomination.WEI);

describe('Numeric', () => {
  describe('Basic Numeric Construction', () => {
    describe('From hexadeciaml strings', () => {
      it('Should create a new Numeric from a hexadecimal string', () => {
        const numeric = new Numeric('0xa', 16);
        expect(numeric.value).toEqual(new BigNumber(10, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with a decimal', () => {
        const numeric = new Numeric('0xa.7', 16);
        expect(numeric.value).toEqual(new BigNumber(10.4375, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with negation', () => {
        const numeric = new Numeric('-0xa', 16);
        expect(numeric.value).toEqual(new BigNumber(-10, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with negation and decimal', () => {
        const numeric = new Numeric('-0xa.7', 16);
        expect(numeric.value).toEqual(new BigNumber(-10.4375, 10));
      });
    });

    describe('From decimal strings', () => {
      it('Should create a new Numeric from a decimal string', () => {
        const numeric = new Numeric('10', 10);
        expect(numeric.value).toEqual(new BigNumber(10, 10));
      });

      it('Should create a new Numeric from a decimal string with a decimal', () => {
        const numeric = new Numeric('10.4375', 10);
        expect(numeric.value).toEqual(new BigNumber(10.4375, 10));
      });

      it('Should create a new Numeric from a decimal string with negation', () => {
        const numeric = new Numeric('-10', 10);
        expect(numeric.value).toEqual(new BigNumber(-10, 10));
      });

      it('Should create a new Numeric from a decimal string with negation and decimal', () => {
        const numeric = new Numeric('-10.4375', 10);
        expect(numeric.value).toEqual(new BigNumber(-10.4375, 10));
      });
    });

    describe('From decimal numbers', () => {
      it('Should create a new Numeric from a hexadecimal number', () => {
        const numeric = new Numeric(10, 10);
        expect(numeric.value).toEqual(new BigNumber(10, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with a decimal', () => {
        const numeric = new Numeric(10.4375, 10);
        expect(numeric.value).toEqual(new BigNumber(10.4375, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with negation', () => {
        const numeric = new Numeric(-10, 10);
        expect(numeric.value).toEqual(new BigNumber(-10, 10));
      });

      it('Should create a new Numeric from a hexadecimal string with negation and decimal', () => {
        const numeric = new Numeric(-10.4375, 16);
        expect(numeric.value).toEqual(new BigNumber(-10.4375, 10));
      });
    });

    describe('From BigNumbers or BN', () => {
      it('Should create a new Numeric from a BigNumber', () => {
        const numeric = new Numeric(new BigNumber(100, 10));
        expect(numeric.value).toEqual(new BigNumber(100, 10));
      });

      it('Should create a new Numeric from a BN', () => {
        const numeric = new Numeric(new BN(100, 10), 10);
        expect(numeric.value).toEqual(new BigNumber(100, 10));
      });
    });
  });

  describe('Error checking', () => {
    it('Should throw an error for a non numeric string', () => {
      expect(() => new Numeric('Hello there', 10)).toThrow(
        'String provided to stringToBigNumber is not a hexadecimal or decimal string: Hello there, 10',
      );
    });

    it('Should throw an error for a numeric string without a base', () => {
      expect(() => new Numeric('10')).toThrow(
        'You must specify the base of the provided number if the value is not already a BigNumber',
      );
    });

    it('Should throw an error for a non numeric type', () => {
      expect(() => new Numeric(true as unknown as number, 10)).toThrow(
        'Value: true is not a string, number, BigNumber or BN. Type is: boolean.',
      );
    });
  });

  describe('Erroneous behaviors that we are temporarily continuing', () => {
    it('Handles values that are undefined, setting the value to 0', () => {
      expect(new Numeric(undefined as unknown as number).toString()).toEqual(
        '0',
      );
    });

    it('Handles values that are NaN, setting the value to 0', () => {
      expect(new Numeric(NaN).toString()).toEqual('0');
    });
  });

  describe('Ether denomination conversion', () => {
    it('should convert 1 ETH to 1000000000 GWEI', () => {
      expect(ONE_ETH.toDenomination(EtherDenomination.GWEI).toString()).toEqual(
        '1000000000',
      );
    });

    it('should convert 1 ETH to 1000000000000000000 WEI', () => {
      expect(ONE_ETH.toDenomination(EtherDenomination.WEI).toString()).toEqual(
        '1000000000000000000',
      );
    });

    it('should convert 1 GWEI to 0.000000001 ETH', () => {
      expect(ONE_GWEI.toDenomination(EtherDenomination.ETH).toString()).toEqual(
        '0.000000001',
      );
    });

    it('should convert 1 GWEI to 1000000000 WEI', () => {
      expect(ONE_GWEI.toDenomination(EtherDenomination.WEI).toString()).toEqual(
        '1000000000',
      );
    });

    it('should convert 1 WEI to 0 ETH due to rounding', () => {
      expect(ONE_WEI.toDenomination(EtherDenomination.ETH).toString()).toEqual(
        '0',
      );
    });

    it('should convert 1 WEI to 0.000000001 GWEI', () => {
      expect(ONE_WEI.toDenomination(EtherDenomination.GWEI).toString()).toEqual(
        '0.000000001',
      );
    });
  });

  describe('Math operations', () => {
    describe('Multiplication', () => {
      it('Should compute correct results for simple multiplication', () => {
        expect(new Numeric(5, 10).times(new Numeric(5, 10)).toNumber()).toEqual(
          25,
        );

        expect(
          new Numeric(5, 10).times(new Numeric(10, 10)).toNumber(),
        ).toEqual(50);

        expect(
          new Numeric(25, 10).times(new Numeric(10, 10)).toNumber(),
        ).toEqual(250);
      });

      it('Should compute correct results for multiplication of big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .times(new Numeric('686216', 10))
            .toString(),
        ).toEqual('120548547381312');

        expect(
          new Numeric('1756714320', 10)
            .times(new Numeric('686216', 10))
            .toString(),
        ).toEqual('1205485473813120');

        expect(
          new Numeric('41756714320', 10)
            .times(new Numeric('6862160', 10))
            .toString(),
        ).toEqual('286541254738131200');
      });

      it('Should compute correct results for multiplication of negative big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .times(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('-120548547381312');

        expect(
          new Numeric('1756714320', 10)
            .times(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('-1205485473813120');

        expect(
          new Numeric('-41756714320', 10)
            .times(new Numeric('-6862160', 10))
            .toString(),
        ).toEqual('286541254738131200');
      });
    });

    describe('Division', () => {
      it('Should compute correct results for simple division', () => {
        expect(
          new Numeric(25, 10).divide(new Numeric(5, 10)).toNumber(),
        ).toEqual(5);

        expect(
          new Numeric(50, 10).divide(new Numeric(10, 10)).toNumber(),
        ).toEqual(5);

        expect(
          new Numeric(250, 10).divide(new Numeric(10, 10)).toNumber(),
        ).toEqual(25);
      });

      it('Should compute correct results for division of big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .divide(new Numeric('686216', 10))
            .toString(),
        ).toEqual('256.00019818832554181191');

        expect(
          new Numeric('1756714320', 10)
            .divide(new Numeric('686216', 10))
            .toString(),
        ).toEqual('2560.00198188325541811908');

        expect(
          new Numeric('41756714320', 10)
            .divide(new Numeric('6862160', 10))
            .toString(),
        ).toEqual('6085.06859647691106007438');
      });

      it('Should compute correct results for division of negative big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .divide(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('-256.00019818832554181191');

        expect(
          new Numeric('1756714320', 10)
            .divide(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('-2560.00198188325541811908');

        expect(
          new Numeric('-41756714320', 10)
            .divide(new Numeric('-6862160', 10))
            .toString(),
        ).toEqual('6085.06859647691106007438');
      });
    });

    describe('Addition', () => {
      it('Should compute correct results for simple addition', () => {
        expect(new Numeric(25, 10).add(new Numeric(5, 10)).toNumber()).toEqual(
          30,
        );

        expect(new Numeric(50, 10).add(new Numeric(10, 10)).toNumber()).toEqual(
          60,
        );

        expect(
          new Numeric(250, 10).add(new Numeric(100, 10)).toNumber(),
        ).toEqual(350);
      });

      it('Should compute correct results for addition of big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .add(new Numeric('686216', 10))
            .toString(),
        ).toEqual('176357648');

        expect(
          new Numeric('1756714320', 10)
            .add(new Numeric('686216', 10))
            .toString(),
        ).toEqual('1757400536');

        expect(
          new Numeric('41756714320', 10)
            .add(new Numeric('6862160', 10))
            .toString(),
        ).toEqual('41763576480');
      });

      it('Should compute correct results for addition of negative big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .add(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('174985216');

        expect(
          new Numeric('1756714320', 10)
            .add(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('1756028104');

        expect(
          new Numeric('-41756714320', 10)
            .add(new Numeric('-6862160', 10))
            .toString(),
        ).toEqual('-41763576480');
      });
    });

    describe('Subtraction', () => {
      it('Should compute correct results for simple subtraction', () => {
        expect(
          new Numeric(25, 10).minus(new Numeric(5, 10)).toNumber(),
        ).toEqual(20);

        expect(
          new Numeric(50, 10).minus(new Numeric(10, 10)).toNumber(),
        ).toEqual(40);

        expect(
          new Numeric(250, 10).minus(new Numeric(100, 10)).toNumber(),
        ).toEqual(150);
      });

      it('Should compute correct results for subtraction of big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .minus(new Numeric('686216', 10))
            .toString(),
        ).toEqual('174985216');

        expect(
          new Numeric('1756714320', 10)
            .minus(new Numeric('686216', 10))
            .toString(),
        ).toEqual('1756028104');

        expect(
          new Numeric('41756714320', 10)
            .minus(new Numeric('6862160', 10))
            .toString(),
        ).toEqual('41749852160');
      });

      it('Should compute correct results for subtraction of negative big numbers', () => {
        expect(
          new Numeric('175671432', 10)
            .minus(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('176357648');

        expect(
          new Numeric('1756714320', 10)
            .minus(new Numeric('-686216', 10))
            .toString(),
        ).toEqual('1757400536');

        expect(
          new Numeric('-41756714320', 10)
            .minus(new Numeric('-6862160', 10))
            .toString(),
        ).toEqual('-41749852160');
      });
    });
  });

  describe('Base conversion', () => {
    it('should convert a hexadecimal string to a decimal string', () => {
      expect(new Numeric('0x5208', 16).toBase(10).toString()).toEqual('21000');
    });

    it('should convert a decimal string to a hexadecimal string', () => {
      expect(new Numeric('21000', 10).toBase(16).toString()).toEqual('5208');
    });

    it('should convert a decimal string to a 0x prefixed hexadecimal string', () => {
      expect(new Numeric('21000', 10).toPrefixedHexString()).toEqual('0x5208');
    });

    it('should convert a decimal number to a hexadecimal string', () => {
      expect(new Numeric(21000, 10).toBase(16).toString()).toEqual('5208');
    });

    it('should convert a decimal number to a 0x prefixed hexadecimal string', () => {
      expect(new Numeric(21000, 10).toPrefixedHexString()).toEqual('0x5208');
    });
  });
});
