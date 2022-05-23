# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
import pandas as pd


df = pd.read_json('./newObj.json')
df["yyyyMMdd"] = pd.to_datetime(
    df["yyyyMMdd"], format="%Y%m%d")  # 型タイプの変換(上書き)

userId = df["userId"][0]
df = df.sort_values('yyyyMMdd')

fig = plt.figure()
plt.plot(df['yyyyMMdd'], df['rate'], marker="D",
         markersize=12, markeredgewidth=3, markeredgecolor="blue",
         markerfacecolor="lightblue")

plt.grid()  # plt.grid()では、グリッドを表示しています。
fig.savefig("../public/images/rates/{}_rate.png".format(userId))
