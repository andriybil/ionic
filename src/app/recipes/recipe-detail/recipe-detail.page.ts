import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss']
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertControler: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('recipeId')) {
        return this.router.navigate(['/recipes']);
      }
      const recipeId = paraMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });
  }
  onDeleteRecipe() {
    this.alertControler
      .create({
        header: 'Are you sure?',
        message: 'Do you realy want to delete the recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this.recipesService.deleteRecipe(this.loadedRecipe.id);
              this.router.navigate(['/recipes']);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
