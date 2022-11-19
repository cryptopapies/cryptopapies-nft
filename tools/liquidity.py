from decimal import Decimal
from sys import argv, exit

STAGE_QTY = Decimal(100)
INCREMENT_FACTOR = Decimal(1.25)


def liquidity(total: Decimal, current_price: Decimal, stage: int) -> Decimal:
    if stage == 11:
        return total

    total = (total + (current_price * STAGE_QTY)).quantize(Decimal("1.000"))
    new_price = (current_price * INCREMENT_FACTOR).quantize(Decimal("1.000"))
    print(f"stage {stage}; total: {total}ETH; price: {current_price}ETH")
    return liquidity(total, new_price, stage + 1)


if __name__ == "__main__":
    if len(argv) < 2:
        print("Usage: <start_price>")
        exit(1)

    start_price = Decimal(argv[1])
    total = liquidity(Decimal(0), start_price, 1)
    print("Total liquidity: %f" % total)
