a = ''' '''

z = []
y = []
z.extend(a.split("\n"))
for fg in z:
    y.extend(fg.split("-"))
# print(y)
french = []
english = []
count = 1
for _ in y:
    if count % 2 == 0:
        english.append(_)
    else:
        french.append(_)
    count += 1

print("let english =", english)
print("let otherlang =", french)
