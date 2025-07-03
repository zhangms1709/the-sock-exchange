text = open("a-midsummer-nights-dream.txt", "r")
store = {}
for i in text.read().split(" "):
    if i.isalnum():
        i = i.lower()
        if i not in store:
            store[i] = 0
        store[i] += 1
# print(store)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient['msnd']
collection = db['words']
for i in store:
    collection.insert_one({i : store[i]})

new_store = {}
chars = set(["Hermia", "Lysander", "Helena", "Demetrius", "Theseus", "Hippolyta", "Egeus", "Philostrate", \
             "Nick Bottom", "Peter Quince", "Francis Flute", "Tom Snout", "Snug", \
             "Robin Starveiling", "Oberon", "Titania", "Robin Goodfellow", "Fairy", "Peaseblossom", "Cobweb", "Mote", "Mustardseed"])
for i in store:
    if i in chars:
        new_store[i] = store[i]

col2 = db['characters']
for i in new_store:
    col2.insert_one({i : new_store[i]})