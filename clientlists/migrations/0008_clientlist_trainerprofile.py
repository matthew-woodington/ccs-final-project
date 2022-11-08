# Generated by Django 4.1.2 on 2022-11-07 16:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_review_created_on'),
        ('clientlists', '0007_remove_clientlist_trainerprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientlist',
            name='trainerprofile',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.trainerprofile'),
            preserve_default=False,
        ),
    ]