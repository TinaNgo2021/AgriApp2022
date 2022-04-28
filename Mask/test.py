import glob, os
os.chdir("images")
file = open("train.txt", "w")
for files in glob.glob("*.png"):
    print(files)
    file.write("%s = %s\n" %("a_dictionary", str(files)))
    