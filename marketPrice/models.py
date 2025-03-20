from django.db import models

# Create your models here.

class DBTables(models.Model):
    date = models.DateField()
    retail_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    predicted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    
    class Meta:
        abstract = True
        
        
class LongBeans(DBTables):
    class Meta:
        db_table = "user_long_beans"
        
class BitterGourd(DBTables):
    class Meta:
        db_table = "user_bitter_gourd"
        
        
class SnakeGourd(DBTables):
    class Meta:
        db_table = "user_snake_gourd"
        

class LadyFingerOkra(DBTables):
    class Meta:
        db_table = "user_ladys_finger_okra"
        
        
class Brinjals(DBTables):
    class Meta:
        db_table = "user_brinjals"
        
class Pineapple(DBTables):
    class Meta:
        db_table = "user_pineapple"
        
class Papaya(DBTables):
    class Meta:
        db_table = "user_papaya"