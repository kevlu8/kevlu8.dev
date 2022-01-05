import requests
import argparse, os

argparser = argparse.ArgumentParser(description='Downloads images from a subreddit.')
argparser.add_argument('-l', '--link', help='The link to download from.')
argparser.add_argument('-t', '--type', help='The type of image.')

# lnk = i.redd.it/something.jpg

lnk = argparser.parse_args().link
typ = argparser.parse_args().type

imgdata = requests.get(lnk).content

imgid = lnk.split('/')[-1]

os.chdir("tags")
os.chdir(typ)

with open(imgid, 'wb+') as handler:
    handler.write(imgdata)
    