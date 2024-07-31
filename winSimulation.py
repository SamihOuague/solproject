import sys

i = 0
limit = 0
wallet = 0
if len(sys.argv) != 3:
    exit()
try:
    wallet = float(sys.argv[1])
    limit = int(sys.argv[2])
except:
    print("Error format.")
    exit()
while i < limit:
    wallet = wallet + (wallet * 0.3)
    i += 1
print(wallet)
